import { MaterialiosProvider } from '@materialios/core'
import { MenuIcon } from '@materialios/icons'
import {
  MainScreen,
  AppBar,
  AppBarLeftIcon,
  Drawer,
  DrawerNav,
  DrawerNavExpandable
} from '@materialios/components'

import './App.css'

const App = () => {
  return (
    <MaterialiosProvider>
      <Drawer>
        <DrawerNav name='First' href='/first' />
        <DrawerNavExpandable name='Second'>
          <DrawerNav name='Alfa' href='/first' />
        </DrawerNavExpandable>
      </Drawer>
      <MainScreen>
        <AppBar>
          <AppBarLeftIcon icon={MenuIcon} />
        </AppBar>
      </MainScreen>
    </MaterialiosProvider>
  )
}

export default App
