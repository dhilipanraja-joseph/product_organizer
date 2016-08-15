const Root = React.createClass({
  getInitialState(){
    try{
      var data=JSON.parse(localStorage.products);
    }catch(e){
      data = [];
    }
    return{
      products : data,
      totalProduct : '',
      totalPrice : ''
    }
  },
  componentDidUpdate(){
    localStorage.products = JSON.stringify(this.state.products);
  },
  addProduct(product) {
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
        <DisplayProducts
            products={this.state.products}
            pro={this.state.products}
            deleteProduct={this.deleteProduct}
            modifyProduct={this.modifyProduct}
        />
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
  getInitialState(){
    return {
      products : this.props.products,
      thName : this.sortByName,
      thPrice : this.sortByPrice

    }
  },
  delete(e){
    let id = e.target.value;
    //this.setState({products : this.state.products.filter(product => product.id !== id)});
    this.props.deleteProduct(id);
  },
  modify(e){
    this.props.modifyProduct(e.target.value);
  },
  resetTable(){
    this.setState({products : this.props.pro , thPrice : this.sortByPrice});
  },
  sortByName(){
    this.setState({data : this.state.products.sort((a,b)=>a.name - b.name)});
  },
  sortByPrice(){
    this.setState({products : this.state.products.sort((a,b)=>a.price - b.price) , thPrice : this.resetTable});
    //console.log('sortiong by price');
    //this.props.sortByPrice();
  },
  render(){
    let products = this.state.products.map(product =>{
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.descr}</td>
          <td><a href={product.imgurl} target="_blank">{product.imgurl}</a></td>
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
            <th onClick={this.state.thName}>Product </th>
            <th onClick={this.state.thPrice}>Price-$ </th>
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
