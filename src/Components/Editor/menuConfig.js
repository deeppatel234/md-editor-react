import React from 'react';

import { TableMenu, LinkMenu, ImageMenu } from '../Menu';

import {
  ItalicIcon,
  BoldIcon,
  UndoIcon,
  RedoIcon,
  StrikeIcon,
  OrderListIcon,
  UnOrderListIcon,
  LineIcon,
  QuoteIcon,
  CodeIcon,
  ClearIcon,
  FullScreenIcon,
  HTMLViewIcon,
  EyeIcon,
  TableIcon,
  LinkIcon,
  ImageIcon,
  CheckBoxIcon,
} from '../Icons';

const headersCommand = (editor, h) => {
  const cursor = editor.getCursor();
  const selection = editor.getSelection();
  const text = `${[...Array(h)].map(() => '#').join('')} ${selection}`;

  if (cursor.ch !== 0) {
    editor.setCursor(cursor.line, 0);
    editor.replaceSelection(text);
    editor.setCursor(cursor.line, cursor.ch + h + 1);
  } else {
    editor.replaceSelection(text);
  }
  editor.focus();
};

export default [
  {
    id: 'bold',
    title: 'Bold',
    icon: <BoldIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`**${selection}**`);
      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 2);
      }
      editor.focus();
    },
  },
  {
    id: 'italic',
    title: 'Italic',
    icon: <ItalicIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`*${selection}*`);
      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 1);
      }
      editor.focus();
    },
  },
  {
    id: 'strike',
    title: 'Strike',
    icon: <StrikeIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`~~${selection}~~`);
      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 2);
      }
      editor.focus();
    },
  },
  {
    divider: true,
  },
  {
    id: 'h1',
    title: 'H1',
    icon: <span>H1</span>,
    command: editor => headersCommand(editor, 1),
  },
  {
    id: 'h2',
    title: 'H2',
    icon: <span>H2</span>,
    command: editor => headersCommand(editor, 2),
  },
  {
    id: 'h3',
    title: 'H3',
    icon: <span>H3</span>,
    command: editor => headersCommand(editor, 3),
  },
  {
    id: 'h4',
    title: 'H4',
    icon: <span>H4</span>,
    command: editor => headersCommand(editor, 4),
  },
  {
    id: 'h5',
    title: 'H5',
    icon: <span>H5</span>,
    command: editor => headersCommand(editor, 5),
  },
  {
    id: 'h6',
    title: 'H6',
    icon: <span>H6</span>,
    command: editor => headersCommand(editor, 6),
  },
  {
    divider: true,
  },
  {
    id: 'orderlist',
    title: 'Order List',
    icon: <OrderListIcon />,
    command: editor => {
      const selection = editor.getSelection();

      if (selection === '') {
        editor.replaceSelection(`1. ${selection}`);
      } else {
        const selectionText = selection
          .split('\n')
          .map((s, i) => (s === '' ? '' : `${i + 1}. ${s}`));

        editor.replaceSelection(selectionText.join('\n'));
      }
      editor.focus();
    },
  },
  {
    id: 'unorderlist',
    title: 'Un Ordered List',
    icon: <UnOrderListIcon />,
    command: editor => {
      const selection = editor.getSelection();

      if (selection === '') {
        editor.replaceSelection(`- ${selection}`);
      } else {
        const selectionText = selection
          .split('\n')
          .map(s => (s === '' ? '' : `- ${s}`));

        editor.replaceSelection(selectionText.join('\n'));
      }
      editor.focus();
    },
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    icon: <CheckBoxIcon />,
    command: editor => {
      const selection = editor.getSelection();

      if (selection === '') {
        editor.replaceSelection(`- [ ] ${selection}`);
      } else {
        const selectionText = selection
          .split('\n')
          .map(s => (s === '' ? '' : `- [ ] ${s}`));

        editor.replaceSelection(selectionText.join('\n'));
      }
      editor.focus();
    },
  },
  {
    id: 'line',
    title: 'Line',
    icon: <LineIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      editor.replaceSelection(
        `${cursor.ch !== 0 ? '\n\n' : '\n'}------------\n\n`,
      );
      editor.focus();
    },
  },
  {
    id: 'quote',
    title: 'Quote',
    icon: <QuoteIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();
      const text = `> ${selection}`;

      if (cursor.ch !== 0) {
        editor.setCursor(cursor.line, 0);
        editor.replaceSelection(text);
        editor.setCursor(cursor.line, cursor.ch + 2);
      } else {
        editor.replaceSelection(text);
      }
      editor.focus();
    },
  },
  {
    divider: true,
  },
  {
    id: 'undo',
    title: 'Undo',
    icon: <UndoIcon />,
    command: editor => editor.undo(),
  },
  {
    id: 'redo',
    title: 'Redo',
    icon: <RedoIcon />,
    command: editor => editor.redo(),
  },
  {
    divider: true,
  },
  {
    id: 'code',
    title: 'Code',
    icon: <CodeIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`\`${selection}\``);

      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 1);
      }
      editor.focus();
    },
  },
  {
    id: 'table',
    title: 'Table',
    icon: <TableIcon />,
    component: TableMenu,
  },
  {
    id: 'link',
    title: 'Link',
    icon: <LinkIcon />,
    component: LinkMenu,
  },
  {
    id: 'image',
    title: 'Image',
    icon: <ImageIcon />,
    component: ImageMenu,
  },
  {
    divider: true,
  },
  {
    id: 'clear',
    title: 'Clear',
    icon: <ClearIcon />,
    command: editor => editor.setValue(''),
  },
  {
    id: 'fullscreen',
    title: 'Full Screen',
    icon: <FullScreenIcon />,
    command: (e, setState, state) => {
      const { fullscreen } = state;
      setState({ fullscreen: !fullscreen });
    },
  },
  {
    id: 'watch',
    title: 'Watch',
    icon: <EyeIcon />,
    command: (e, setState, state) => {
      const { watchMode } = state;
      setState({ watchMode: !watchMode });
    },
  },
  {
    id: 'htmlview',
    title: 'HTML View',
    icon: <HTMLViewIcon />,
    command: (e, setState, state) => {
      const { htmlView } = state;
      setState({ htmlView: !htmlView });
    },
  },
];
