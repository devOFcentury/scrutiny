import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';

export const dataSideBar = [
     {
          title: 'Accueil',
          path: '',
          icon: <TbIcons.TbLayoutGrid />,
          cName: 'nav-text'
        },
        {
          title: 'Retards',
          path: 'retards',
          icon: <TbIcons.TbListCheck />,
          
          cName: 'nav-text'
        },
        {
          title: 'Absences',
          path: 'absences',
          icon: <MdIcons.MdOutlinePersonOff />,
          cName: 'nav-text'
        },
        {
          title: 'Compteur',
          path: 'compteur',
          icon: <BsIcons.BsStopwatch />,
          cName: 'nav-text'
        },
        {
          title: 'Settings',
          path: 'settings',
          icon: <AiIcons.AiOutlineSetting />,
          cName: 'nav-text'
        },
]