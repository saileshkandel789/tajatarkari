import React, { Component } from 'react';
import axios from "axios";
import {API} from "../../config"

 class AddCategory extends Component {
    state = {
        name: "",
        parentId: "",
        errors: "",
        categoryList : []
      };

      componentDidMount() {
        axios.get(`${API}/category`).then((res) => {
          console.log(res,'rrrr');
            this.setState({
                categoryList: res.data,
            });
          })
          .catch((err) => console.log(err));
      }
      renderCategories = (categories , mycategory = []) => {
        // let mycategory = [];
        for (let category of categories) {
            mycategory.push(
              {value:category._id , name: category.name})
              if(category.children.length > 0) {
                this.renderCategories(category.children , mycategory)
              }
        }
        return mycategory;
    }
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      onSubmit = this.onSubmit.bind(this);

    onSubmit(e) {
        e.preventDefault();
        // const fd = new FormData();
    
        // fd.append("name", this.state.name);
        // fd.append("parentId", this.state.parentId);
        // // fd.append("isAuth" , this.props.auth.isAuthenticated );

        // console.log(this.state.parentId ,'fd');
        // console.log(this.state.name ,'fd');

        axios
          .post(`${API}/category`, {
            name: this.state.name,
            parentId : this.state.parentId
          })
          .then((res) =>
            this.setState({
              name: "",
              parentId: ""
            })
          )
          .catch((err) => this.setState({
            errors: err
          }));
      }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                  <div className="form-group ">
                    <input
                      type="text"
                      placeholder="Category Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange.bind(this)}
                    />
                  </div>

                  <div className="form-group">
                        <select onChange={this.onChange.bind(this)} name="parentId">
                                <option value="" key="1">
                                    please select
                                </option>
                                {/* {this.renderCategories(this.state.categoryList)} */}
                             {this.renderCategories(this.state.categoryList ).map((cate) => (
                                <option value={cate.value} key={cate.value}>
                                    {cate.name}
                                </option>
                                ))} 
                          </select>
                  </div>
                  {/* {JSON.stringify(this.renderCategories(this.state.categoryList ))} */}

                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Submit"
                  />
                </form>
            </div>
        )
    }
}

export default AddCategory
