import React, {useState} from 'react';
import AjoutMembre from './AjoutMembre';
import './Membres.css';

const Membres = () => {
     
     const [addMember, setAddMember] = useState(false);
     
  return (
    <div className='Membres'>
          <button className='Membres-button' onClick={()=>setAddMember(true)}>Ajouter un Membre</button>
     {addMember && <AjoutMembre setAddMember={setAddMember} />}
     </div>
  )
}

export default Membres