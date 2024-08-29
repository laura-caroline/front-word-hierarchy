import React, { useState } from "react";
import { WordNodeProps } from "./interfaces";
import './styles.css'; 

export const WordNodeComponent: React.FC<WordNodeProps> = ({ node, name, addSubcategory, addItem }) => {
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newItemName, setNewItemName] = useState('');

  return (
    <div className="container">
      <strong className="title">{name}</strong>
      <ul>
        {node.items && node.items.map(item => (
          <li key={item} className="item">{item}</li>
        ))}
      </ul>
      {node.subcategories && Object.keys(node.subcategories).map(sub => (
        <WordNodeComponent
          key={sub}
          name={sub}
          node={node.subcategories![sub]}
          addSubcategory={addSubcategory}
          addItem={addItem}
        />
      ))}
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          placeholder="Nova Subcategoria"
          className="inputField"
        />
        <button onClick={() => {
          if (newSubcategoryName.trim()) {
            addSubcategory(newSubcategoryName, node);
            setNewSubcategoryName('');
          }
        }} className="addButton">
          Adicionar Subcategoria
        </button>
      </div>
      {addItem && (
        <div>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Novo Item"
            className="inputField"
          />
          <button onClick={() => {
            if (newItemName.trim()) {
              addItem(newItemName, node);
              setNewItemName('');
            }
          }} className="addButton addButtonItem">
            Adicionar Item
          </button>
        </div>
      )}
    </div>
  );
};
