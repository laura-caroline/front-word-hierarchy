import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { WordHierarchy, WordNode } from '../../components/WordNode/interfaces';
import { WordNodeComponent } from '../../components/WordNode';
import './styles.css'; 

const initialHierarchy: WordHierarchy = {
  Animais: {
    depth: 1,
    subcategories: {}
  }
};

export const Home: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<WordHierarchy>(initialHierarchy);

  const addSubcategory = (name: string, parent: WordNode) => {
    if (!parent.subcategories) {
      parent.subcategories = {};
    }
    parent.subcategories[name] = { depth: parent.depth + 1 };
    setHierarchy({ ...hierarchy });
  };

  const addItemSubcategory = (item: string, parent: WordNode) => {
    if (!parent.items) {
      parent.items = [];
    }
    parent.items.push(item);
    setHierarchy({ ...hierarchy });
  };

  const saveHierarchy = () => {
    const json = JSON.stringify(hierarchy, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'hierarchy.json');
  };

  return (
    <div className="container">
      <h1 className="title">Gerenciador de Hierarquia de Palavras</h1>
      {Object.keys(hierarchy).map((key) => (
        <WordNodeComponent
          key={key}
          name={key}
          node={hierarchy[key]}
          addSubcategory={addSubcategory}
          addItem={addItemSubcategory}
        />
      ))}
      <button onClick={saveHierarchy} className='saveButton'>
        Salvar Hierarquia
      </button>
    </div>
  );
};
