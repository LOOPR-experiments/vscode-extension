import * as vscode from 'vscode';

export function getExtensionSetting(key: string): string | undefined {
  const config = vscode.workspace.getConfiguration('loopr');
  return config.get<string>(key);
}
