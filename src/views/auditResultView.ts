import * as vscode from 'vscode';

export class AuditResultView {
  public static currentPanel: AuditResultView | undefined;
  private readonly panel: vscode.WebviewPanel;
  private disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri, code: string) {
    const column = vscode.ViewColumn.Beside;
    if (AuditResultView.currentPanel) {
      AuditResultView.currentPanel.panel.reveal(column);
      AuditResultView.currentPanel.update(code);
    } else {
      const panel = vscode.window.createWebviewPanel(
        'looprAudit',
        'Loopr Audit Results',
        column,
        { enableScripts: true }
      );
      AuditResultView.currentPanel = new AuditResultView(panel, extensionUri, code);
    }
  }

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    code: string
  ) {
    this.panel = panel;
    this.update(code);
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
  }

  public update(code: string) {
    this.panel.webview.html = this.getHtmlForWebview(code);
  }

  private getHtmlForWebview(code: string): string {
    // Simple loading then code display; integrate real API call later
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Loopr Audit</title>
      </head>
      <body>
        <h2>Audit Input</h2>
        <pre>${code.replace(/</g, '&lt;')}</pre>
        <h2>Audit Results</h2>
        <p><em>Results will appear here (beta)</em></p>
      </body>
      </html>
    `;
  }

  public dispose() {
    AuditResultView.currentPanel = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) { x.dispose(); }
    }
  }
}
