import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { deleteProject, deleteRoom, deleteMaterial } from '../../thunks/fetchAllProjects';
import { connect } from 'react-redux';

export class DeleteConfirm extends Component {
  
  showConfirm(type, id, deleteProject, projectId, deleteRoom, deleteMaterial, materialType, roomMaterials) {
    const confirm = Modal.confirm;
    console.log(id, this.props)
    confirm({
      title: 'Are you sure you want to delete this item and all contents within?',
      content: 'Click OK to confirm deletion.',
      onOk() {
        if(type === 'project') {
          deleteProject(id)
        }
        if(type === 'room') {
          deleteRoom(id, projectId)
        }
        if(type === 'material') {
          deleteMaterial(materialType, id, roomMaterials[0].id)
        }
      },
      onCancel() {},
    });
  }

  render() {
    const {id, type, deleteProject, projectId, deleteRoom, deleteMaterial, materialType, roomMaterials} = this.props
    return (
      <Button onClick={() => this.showConfirm(type, id, deleteProject, projectId, deleteRoom, deleteMaterial, materialType, roomMaterials)} className='confirm-btn' type="link">
        <i className="fas fa-trash-alt"></i>
      </Button>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  deleteProject: (id) => dispatch(deleteProject(id)),
  deleteRoom: (id, projectId) => dispatch(deleteRoom(id, projectId)),
  deleteMaterial: (materialType, id, rmid) => dispatch(deleteMaterial(materialType, id, rmid))
})

export const mapStateToProps = state => ({
  projects: state.projects,
  materials: state.materials
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirm);