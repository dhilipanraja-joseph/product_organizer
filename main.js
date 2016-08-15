const Root = React.createClass({
  render(){
    return (
      <div>
        <h1>Product Organizer</h1>
        <CreateProduct/>
      </div>
    );
  }
});

const CreateProduct = React.createClass({
  getInitialState(){
    return {
      name : '',
      price : '',
      descr : ''
    }
  },
  resetForm(){
    
  },
  render(){
    return (
      <form>
        <input type="text" value={this.state.name}  onChange={e=>this.setState({name:e.target.value})} placeholder="Product Name"/><br/>
        <input type="text" value={this.state.price}  onChange={e=>this.setState({price:e.target.value})} placeholder="Price"/><br/>
        <input type="text" value={this.state.descr}  onChange={e=>this.setState({descr:e.target.value})} placeholder="Description"/><br/>
        <button type="submit">Add</button>
        <button onclick={this.resetForm}>Reset</button>
      </form>
    );
  }
});

ReactDOM.render(
  <div>
    <Root/>
  </div>,
  document.getElementById('root')
);
