import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/javascript/javascript");

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      slug: "",
      code: ""
    };
  }

  componentDidMount() {
    console.log("this.props.match.params.id");
    console.log(this.props.match.params.id);
  }

  setPostSlug() {}

  handleChange = e => {
    const { name, value } = e.target;

    if (name === "post_name") {
      const slug = value.replace(/\s|\.|\,/g, "-"); //
      this.setState({
        slug
      });
    }
  };

  handleSubmit(e) {
    console.log("~Go: ", e);
    console.log("Gather payload");
    console.log();
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: "html"
    };

    return (
      <div>
        <div className="container bzContent">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="label">Post title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="post_name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="label">Post slug</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={this.state.slug}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="label">Post content</label>

                  <CodeMirror
                    value="<h1>I ♥ react-codemirror2</h1>"
                    options={{
                      mode: "javascript",
                      theme: "material",
                      lineNumbers: true
                    }}
                    onChange={(editor, data, value) => {}}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="label">Publish date</label>
                </div>
                <div className="form-group" />
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="label">Post tags</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="label">SEO keywords</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="label">SEO description</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    className="bzButton__big bzButton__green"
                    type="submit"
                    name="Submit"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { auth: state.auth };
// }

// export default connect(mapStateToProps, actions)(App);
export default PostForm;
