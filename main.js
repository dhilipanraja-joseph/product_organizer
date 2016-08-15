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
    location.reload();
  },
  addProduct(product) {
    this.setState({products : this.state.products.concat(product)});
  },
  deleteProduct(id){
    this.setState({products : this.state.products.filter(product => product.id !== id)});
  },
  modifyProduct(id){
    let index = this.state.products.findIndex(x => x.id ===id);
    let mProduct = this.state.products;
    let name = prompt("Change Product Name",mProduct[index].name);
    let price = prompt("Change Price",mProduct[index].price);
    let descr = prompt("Change Description",mProduct[index].descr);
    let imgurl = prompt("Change ImageURL",mProduct[index].imgurl);
    mProduct[index] = {id:uuid(),name,price,descr,imgurl};
    this.setState({products : mProduct});
  },
  render(){
    return (
      <div>
        <h1>Product Organizer</h1>
        <ProductForm addProduct={this.addProduct}/>
        <ProductStatus products={this.state.products}/>
        <DisplayProducts
            products={this.state.products}
            deleteProduct={this.deleteProduct}
            modifyProduct={this.modifyProduct}
        />
      </div>
    );
  }
});



const ProductStatus = React.createClass({
  render(){
    let tValue=0;
    this.props.products.forEach(pro=>{
          tValue += parseInt(pro.price);
    });
    return (
      <div><br/>
        <span>Total Products : {this.props.products.length} </span>
        <span>Total Value : {tValue}</span><br/>
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
  addProduct(){
    //e.preventDefault();
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
  reorderP(){
    console.log('reorder');
    this.setState({
      products: this.props.products,
      thPrice : this.sortByPrice
    });
  },
  reorderN(){
    console.log('reorder');
    this.setState({
      products: this.props.products,
      thName : this.sortByName
    });
  },
  sortByName(){

    console.log('sort by Name');
    this.setState({
      products :this.props.products.slice(0).sort((a,b)=>{
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                  if(x<y){
                    return -1;
                  }else if(x>y){
                    return 1;
                  }else{
                    return 0;
                  }
                }),
      thName : this.reorderN
    });
  },
  sortByPrice(){
    console.log('sort by price');
    //this.state.products.concat().sort((a,b)=>a.price - b.price);

    //console.log(sPros);
    this.setState({
      products: this.props.products.slice(0).sort((a,b)=>a.price-b.price),
      thPrice : this.reorderP
    });
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
