import React, { Component } from 'react';
import axios from "axios";
import { API } from "../../config";


export class CategoryHome extends Component {
    state = {
        category: [],
        errors: "",
      };
    componentDidMount() {
        axios.get(`${API}/category`).then((res) => {
            this.setState({
              category: res.data,
            });
          })
          .catch((err) => console.log(err));
    }
    renderCategories = (categories) => {
        let mycategory = [];
        for (let category of categories) {
            mycategory.push(
                <li key= {category.name}>
                    {category.name}
                    <div className = "sublist">
                    {/* {category.children.length > 0 ? (<ul> {this.renderCategories(category.children)} </ul>) : null} */}
                    {category.children.length > 0 ? (<ul className = "sublist" > {category.children.map(c => 
                        (<li key= {c.name}>{c.name}
                        {c.children.length > 0 ? (
                            <ul className = "sublist1"> {c.children.map(cc => 
                                 (<li key= {cc.name}>{cc.name}</li>)
                            )}</ul>
                        ) : ''}
                        </li>)
                    )} </ul>) : null}

                    </div>
                </li>
            )
        }
        return mycategory;
    }
    render() {
        return (
            <div className = "categorylist">
                <ul>
                    {this.renderCategories(this.state.category)}
                </ul>
            </div>
        )
    }
}

export default CategoryHome;
