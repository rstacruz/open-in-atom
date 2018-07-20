'use babel';

import OpenInAtomView from './open-in-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  openInAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.openInAtomView = new OpenInAtomView(state.openInAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.openInAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-in-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.openInAtomView.destroy();
  },

  serialize() {
    return {
      openInAtomViewState: this.openInAtomView.serialize()
    };
  },

  toggle() {
    console.log('OpenInAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
