// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tosingleline.execute', () => {
		// The code you place here will be executed every time your command is executed


		let editor = vscode.window.activeTextEditor;
		let document = editor?.document;
		if (document) {
			let text = document.getText();

			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));

			const searchRegExpReturns = /[\r\n]/gm;
			const replaceWith = ' ';
			const searchRegExpTwoOrMoreSpaces = /\s{2,}/gm;

			text = text.replace(searchRegExpReturns, replaceWith);
			text = text.replace(searchRegExpTwoOrMoreSpaces, replaceWith);
			editor?.edit(e => e.replace(fullRange, text));
			vscode.window.showInformationMessage('Text processed with ToSingleLine!');

		}
		else {
			vscode.window.showErrorMessage('A text editor must be active');
		}
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('tosingleline.selection.execute', () => {
		// The code you place here will be executed every time your command is executed


		let editor = vscode.window.activeTextEditor;
		let document = editor?.document;
		if (document) {

			editor?.edit(editBuilder => {
				editor?.selections.forEach(sel => {
					const range = sel.isEmpty ? document?.getWordRangeAtPosition(sel.start) || sel : sel;
					let text = document?.getText(range);
					
					const searchRegExpReturns = /[\r\n]/gm;
					const replaceWith = ' ';
					const searchRegExpTwoOrMoreSpaces = /\s{2,}/gm;

					text = text?.replace(searchRegExpReturns, replaceWith);
					text = text?.replace(searchRegExpTwoOrMoreSpaces, replaceWith);

					editBuilder.replace(range, text??'');
				});
			});

			
			
			vscode.window.showInformationMessage('Text processed with ToSingleLine!');

		}
		else {
			vscode.window.showErrorMessage('A text editor must be active');
		}
	});

	context.subscriptions.push(disposable);
}



// this method is called when your extension is deactivated
export function deactivate() { }
