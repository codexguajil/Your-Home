import React from 'react';
import { Drawer, List } from 'antd';
import RoomItems from '../../containers/RoomItems/RoomItems';
import EditRoom from '../../containers/EditRoom/EditRoom';

class Room extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  editRoom = () => {
    console.log('edit!')
  }

  deleteRoom = () => {
    console.log('delete!')
  }

  render() {
    const { name, type, description, roomMaterials } = this.props
    return (
      <div className='room'>
        <List
          dataSource={[
            {
              name: name,
              description: description,
            }
          ]}
          bordered
          renderItem={item => (
            <List.Item key={item.id} actions={[
              <a onClick={this.showDrawer}>View Materials</a>,
              // <a onClick={this.editRoom}><i className="fas fa-pen"></i></a>,
              <EditRoom />,
              <a onClick={this.deleteRoom}><i className="fas fa-trash-alt"></i></a>
            ]}>
              <List.Item.Meta
                title={item.name}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <RoomItems type={type}
                     materials={roomMaterials}
          />
        </Drawer>
      </div>
    );
  }
}


export default Room;