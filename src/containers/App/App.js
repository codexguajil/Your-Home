import React, { Component } from 'react';
import NewProject from '../NewProject/NewProject';
import SideDrawer from '../SideDrawer/SideDrawer';
import ProjectsContainer from '../../components/ProjectsContainer/ProjectsContainer';
import { Link, Switch, Route } from 'react-router-dom';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import mockProjects from '../../mockProject';

class App extends Component {

  renderProject = ({ match }) => {
    const project = mockProjects.data.projects.find(project => (project.id === parseInt(match.params.id)))
    return <ProjectDetails project={project} />
  }

  render() {
    return (
      <div className="App" id='App'>
        <header className="App-header">
          <SideDrawer />
          <Link to='/'>
            <h1>YourHome</h1>
          </Link>
          <NewProject />
        </header>
        <div>
          <Switch>
            <Route exact path='/'
              render={() => <ProjectsContainer projects={mockProjects.data.projects} />}
            />
            <Route exact path='/projects/:id'
              render={this.renderProject}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;