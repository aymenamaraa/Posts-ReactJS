import React from "react";
import "./App.css";
import ListItems from "./ListItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  /*
  constructor
  class component on l'utilise dans le cas de besoin d'un
  statefull component
  statefull => une propriété du composant " component" donc
  un statefull component est une classe qui hérite les propriétés d
  React.Component
  */
  constructor(props) {
    super(props);
    this.state = {
      items: [], // tableau des posts
      currentItem: {
        // le nouveau post à Ajouter
        text: "",
        key: ""
      }
    };

    /*
binding des functions qui gèrenent les évennements
à l'instance du composant
*/
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  /*
fonction qui permet d'ajouter le nouveau post
au tableau des posts
*/
  addItem(e) {
    e.preventDefault(); // annuler le reload de la page on submit form
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: ""
        }
      });
    }
  }
  /**
lors de changement de la valeur de l'input
on modifi la valeur de currentItem
  */
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    });
  }

  /*
Suppression d'un item du state
*/
  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems
    });
  }
  /*
La mise à jour se fait dans le composant fils
donc toute la fonction steUpdate est envoyée en parametre 
au composant fils
*/
  setUpdate(text, key) {
    console.log("items:" + this.state.items);
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        console.log(item.key + "    " + key);
        item.text = text;
      }
      return item;
    });
    this.setState({
      items: items
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <form id="post-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter post"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            ></input>
            <button type="submit">Add</button>
          </form>

          <h3>
            {this.state.items.length}
            {this.state.items.length > 1 ? " posts" : " post"}
          </h3>
          <ListItems
            items={this.state.items}
            deleteItem={this.deleteItem}
            setUpdate={this.setUpdate}
          />
        </header>
      </div>
    );
  }
}

export default App;
