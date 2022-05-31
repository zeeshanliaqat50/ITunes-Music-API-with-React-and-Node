import React, { Component } from 'react'

export default class Favorites extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            'myFavourites' : []
        }
    }
    componentDidMount()
    {
        if(localStorage['myfavourites']!=null){
        this.setState({'myFavourites' : JSON.parse(localStorage.getItem('myfavourites'))})
        }
    }
    deleteRecord=(evt)=>{
        alert('del')
        let record = evt.target.attributes.getNamedItem("dataSet").value;

    let index=-1;
    for(let x=0; x<this.state.myFavourites.length; x++)
    {
       
        if(JSON.parse(this.state.myFavourites[x]).trackId===JSON.parse(record).trackId)
        {
            index=x;
            break;
        }
    }

    alert(index)
   this.setState({'myFavoruites': this.state.myFavourites.splice(index,index+1)}) //splice is a method of an array to delete a value at a given index
   localStorage['myfavourites']=JSON.stringify(this.state.myFavourites);
console.log(this.state.myFavourites);
    }
  render() {
    return (
      <div className='main'>
          <h2>My Favourites</h2>
          <table>
              <tbody>
              <tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        {this.state.myFavourites.map(record=>{
                        return (
                            <tr key={JSON.parse(record).trackId}>
                              <td>{JSON.parse(record).artistName}</td>
                              <td>{JSON.parse(record).collectionName}</td>
                              <td>{JSON.parse(record).collectionPrice}</td>
                              <td>
                                <input
                                className='btn'
                                  type="button"
                                  value='Delete from Favourites'
                                  dataSet={record}
                                  onClick={this.deleteRecord}
                                ></input>
                              </td>
                            </tr>
                          );


        })}
              </tbody>
          </table>
      </div>
    )
  }
}
