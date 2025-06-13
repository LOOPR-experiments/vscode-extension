import * as vscode from 'vscode';
import { AuditResultView } from '../views/auditResultView';

export function registerAuditCommand(context: vscode.ExtensionContext): vscode.Disposable {
  const disposable = vscode.commands.registerCommand('loopr.auditCode', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor to audit');
      return;
    }
    const code = editor.document.getText(
      editor.selection.isEmpty ? undefined : editor.selection
    );
    AuditResultView.createOrShow(context.extensionUri, code);
  });
  return disposable;
}
