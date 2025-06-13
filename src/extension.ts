import * as vscode from 'vscode';
import { registerAuditCommand } from './commands/auditCommand';

export function activate(context: vscode.ExtensionContext) {
  console.log('🔄 Loopr Audit Extension activated');
  context.subscriptions.push(registerAuditCommand(context));
}

export function deactivate() {}
