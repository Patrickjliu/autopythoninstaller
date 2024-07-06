import * as vscode from 'vscode';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.installMissingPackages', () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let scriptText = editor.document.getText();
            let missingPackages = detectMissingPackages(scriptText);
            if (missingPackages.length > 0) {
                installPackages(missingPackages);
            }
        }
    });

    context.subscriptions.push(disposable);
}

function detectMissingPackages(scriptText: string): string[] {
    // Logic to parse the script and detect missing packages
    // Return a list of missing packages
    return ['numpy', 'pandas']; // Example list of missing packages
}

function installPackages(packages: string[]) {
    packages.forEach((pkg) => {
        child_process.exec(`pip install ${pkg}`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Failed to install ${pkg}: ${error.message}`);
            } else {
                vscode.window.showInformationMessage(`Successfully installed ${pkg}`);
            }
        });
    });
}