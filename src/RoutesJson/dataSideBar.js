import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi'

export const dataSideBar = [
      {
          title: 'Accueil',
          path: '',
          icon: <TbIcons.TbLayoutGrid />,
      },
      {
        title: 'Retards',
        path: 'retards',
        icon: <TbIcons.TbListCheck />,          
      },
      {
        title: 'Absences',
        path: 'absences',
        icon: <MdIcons.MdOutlinePersonOff />,
      },
      {
        title: 'Compteur',
        path: 'compteur',
        icon: <BsIcons.BsStopwatch />,
      },
      {
        title: 'Membres',
        path: 'membres',
        icon: <AiIcons.AiOutlineUsergroupAdd />,
      },
      {
        title: 'Settings',
        path: 'settings',
        icon: <AiIcons.AiOutlineSetting />,
      },
]