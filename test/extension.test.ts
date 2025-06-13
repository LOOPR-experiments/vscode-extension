import * as vscode from 'vscode';
import * as assert from 'assert';
import { activate, deactivate } from '../src/extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('activate/deactivate should not throw', () => {
    assert.doesNotThrow(() => activate({ subscriptions: [] } as any));
    assert.doesNotThrow(() => deactivate());
  });
});
