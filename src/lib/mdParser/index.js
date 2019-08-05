import marked from 'marked';
import './style.scss';

const markedRender = new marked.Renderer();

const renderListitem = markedRender.listitem.bind(markedRender);

markedRender.listitem = (text, task) => {
  let html = renderListitem(text, task);
  if (task) {
    html = html.replace('<input ', "<input class='task-list-item-checkbox' ");
    html = html.replace('<li>', "<li class='task-list-item'>");
  }
  return html;
};

export default (options = {}) => {
  marked.setOptions({
    renderer: markedRender,
    gfm: true,
    breaks: true,
    ...options,
  });

  return marked;
};
