import React from 'react';
import {Layout, Menu} from "antd";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
    const [databases, setDatabases] = React.useState<{Database: string}[]>([]);

    React.useEffect(()=>{
        axios.get('/database').then(r => {
            setDatabases(r.data);
        })
    }, []);

    console.log(databases);

  return (
    <>
      <Layout>
          <Layout.Header>
          </Layout.Header>
          <Layout>
              <Layout.Sider width={200}>
                <Menu mode={"inline"}>
                    <Menu.SubMenu title={"database"}>
                        <Menu.Item>database</Menu.Item>
                        <Menu.Item>queries</Menu.Item>
                        <Menu.Item>Seeder</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu title={"files"}>

                    </Menu.SubMenu>
                </Menu>
              </Layout.Sider>
              <Layout.Content >
                  <Menu mode={"inline"}>
                      {
                          databases.map(db => <Menu.Item>{db.Database}</Menu.Item>)
                      }
                  </Menu>
              </Layout.Content>
          </Layout>
      </Layout>
    </>
  );
}

export default App;
