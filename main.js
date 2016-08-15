const Root = React.createClass({
  getInitialState(){
    try{
      var data=JSON.parse(localStorage.products);
    }catch(e){
      data = [];
    }
    return{
      products : data
    }
  },
  componentDidUpdate(){

      localStorage.products = JSON.stringify(this.state.products);
  },
  addProduct(product) {

    console.log("add product",product);

      this.setState({products : this.state.products.concat(product)});

  },
  deleteProduct(id){

    this.setState({products : this.state.products.filter(product => product.id !== id)});
  },
  modifyProduct(id){

  },
  render(){
    return (
      <div>
        <h1>Product Organizer</h1>
        <ProductForm addProduct={this.addProduct}/>
        <DisplayProducts products={this.state.products}/>
      </div>
    );
  }
});






const ProductForm = React.createClass({
  getInitialState(){
    return {
      name : '',
      price : '',
      descr : '',
      imgurl : ''
    }
  },
  resetForm(e){
    e.preventDefault();
    this.setState({
      name : '',
      price : '',
      descr : '',
      imgurl : ''
    });
  },
  addProduct(e){
    e.preventDefault();
    let product = {
      id : uuid(),
      name : this.state.name,
      price : this.state.price,
      descr : this.state.descr,
      imgurl : this.state.imgurl
    };
    this.props.addProduct(product);
    this.setState({
      name : '',
      price : '',
      descr : '',
      imgurl : ''
    });
  },
  render(){
    return (
      <form onSubmit={this.addProduct}>
        <input type="text" value={this.state.name}  onChange={e=>this.setState({name:e.target.value})} placeholder="Product Name"/><br/>
        <input type="number" value={this.state.price}  onChange={e=>this.setState({price:e.target.value})} placeholder="Price"/><br/>
        <input type="text" value={this.state.descr}  onChange={e=>this.setState({descr:e.target.value})} placeholder="Description"/><br/>
        <input type="text" value={this.state.imgurl}  onChange={e=>this.setState({imgurl:e.target.value})} placeholder="img link"/><br/>
        <button type="submit">Add</button>
        <button onClick={this.resetForm}>Reset</button>
      </form>
    );
  }
});




const DisplayProducts = React.createClass({
  sortProName(){
    console.log('sorting by name');
  },
  sortByPrice(){
    console.log('sortiong by price');
  },
  render(){
    let products = this.props.products.map(product =>{
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.descr}</td>
          <td>{product.imgurl}</td>
          <td>
            <button onClick={this.delete} value={product.id}>-</button>
            <button onClick={this.modify} value={product.id}>?</button>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th onClick={this.sortProName}>Product</th>
            <th onClick={this.sortByPrice}>Price $</th>
            <th>Description</th>
            <th>ImgLink</th>
            <th>Edit</th>
          </tr>
        </thead>
          <tbody>
            {products}
          </tbody>
      </table>
    );
  }
});


ReactDOM.render(
  <div>
    <Root/>
  </div>,
  document.getElementById('root')
);
