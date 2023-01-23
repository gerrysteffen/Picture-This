import React from 'react'
import { Modal } from '@mui/material'
import { PhotoType } from '../../types'
import './ImageModal.css'

type ImageDialogueType = {
  openModal:boolean, 
  setOpenModal(openModal:boolean):void,
  item:PhotoType
}

export default function ImageModal({openModal, setOpenModal, item}:ImageDialogueType) {
  return (
    <Modal 
      open={openModal}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClose={()=>setOpenModal(false)}
    >
      <img 
        className='modal-container'
        src={item.imgAddress}
        alt={item.owner}  
      />
    </Modal>
  )
}
