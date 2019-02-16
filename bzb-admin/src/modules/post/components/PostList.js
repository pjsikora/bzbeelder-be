import React, { Component } from "react";
import BZBDataGrid from "../../../core/components/BZBDataGrid";
import { PostDataGridColumns, PostDataGridConfig } from "../PostHelpers";

class PostList extends Component {
  render() {
    const data = [
      { name: "Name 001", date: 1 },
      { name: "Name 002", date: 2 },
      { name: "Name 003", date: 3 }
    ];

    return (
      <div className="container elementsList">
        <BZBDataGrid
          config={PostDataGridConfig}
          columns={PostDataGridColumns}
          data={data}
        />
      </div>
    );
  }
}

export default PostList;
