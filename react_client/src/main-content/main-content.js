import React, { Component } from 'react';
import './main-content.css'

import EntriesList from '../entries-list/entries-list'


class Content extends Component {

  render() {

    return (
      <div className="wrapper">

        <EntriesList entries={this.props.entries} parentMethods={this.props.parentMethods} ></EntriesList>

        {/*<Todos></Todos>*/}

      </div>
    );
  }
}

export default Content;