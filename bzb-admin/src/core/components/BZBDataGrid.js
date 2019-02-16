import React, { Component } from "react";

class BZBDataGrid extends Component {
  render() {
    const { config, columns, data } = this.props;

    return (
      <div>
        <div class="row">
          <div class="col">
            <p class="elementsList__h1">{config.title && config.title}</p>
          </div>
          <div class="col text-right">
            <input
              aria-describedby="emailHelp"
              class="form-control"
              id="element_name"
              name="searchText"
              placeholder="Search..."
            />
            <button class="btn btn-primary bzButton__big" type="button">
              Create new
            </button>
          </div>
        </div>
        <table className="listElementTable">
          <thead>
            <tr>
              {columns.map(column => (
                <td className="listHeader">
                  <span className="fadeInLeft animated">{column.name}</span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr className="listElement listElementTablerow fadeIn animated">
                {columns.map(column => (
                  <td className="listElement__value ">
                    {column.type !== "actions" && (
                      <span className="fadeInLeft animated">
                        <span>{row[column.key]}</span>
                      </span>
                    )}
                    {column.type === "actions" && (
                      <span className="fadeInLeft animated">
                        <span>Actions</span>
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BZBDataGrid;
