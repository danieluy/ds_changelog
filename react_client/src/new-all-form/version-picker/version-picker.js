import React, { Component } from 'react';
import './version-picker.css'


class VersionPicker extends Component {

  render() {

    const versions = this.props.versions || [];

    this.version_views = versions.map((version, i) => {
      return (
        <option key={`version${i}`} value={version}>
          {version}
        </option>
      )
    })

    return (
      <div>

        <label htmlFor="version">Version *</label>
        
        <input name="version" placeholder="v0.0.0" required />

        {/*<select id="versions" name="version">
          {this.version_views}
        </select>*/}

        {/*<input name="version" list="sponsors_list" placeholder="v0.0.0" />
        <datalist id="sponsors_list">
          <option value="v0.1.0">v0.1.0</option>
          {this.version_views}
        </datalist>*/}

      </div>


    );
  }
}

export default VersionPicker;