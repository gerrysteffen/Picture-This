import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import Link from '@mui/material/Link';
import { PhotoType } from '../../types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import APIs from '../../APIServices/index';
import ImageModal from './ImageModal';

type ImageViewType = {
  item: PhotoType;
  index: number;
  deleteImage(index: number): void;
  userId: string;
};

export default function ImageView({
  item,
  index,
  deleteImage,
  userId,
}: ImageViewType) {
  const [likedByUser, setLikedByUser] = useState(
    item.liked.indexOf(userId) !== -1 ? true : false
  );
  const [likes, setLikes] = useState(item.liked.length);
  const [openModal, setOpenModal] = useState(false);

  const createDownloadLink = (imgAddress: string) => {
    const imageLink = imgAddress.slice(8);
    const linkAsArray = imageLink.split('/');
    linkAsArray.splice(
      linkAsArray.indexOf('upload') + 1,
      0,
      'fl_attachment'
    );
    const newLink = 'https://' + linkAsArray.join('/');
    return newLink;
  };

  const toggleLike = () => {
    APIs.likePhoto(item._id);
    if (!likedByUser) {
      let likesCopy = likes + 1;
      setLikes(likesCopy);
    } else {
      let likesCopy = likes - 1;
      setLikes(likesCopy);
    }
    setLikedByUser(!likedByUser);
  };
  const handleDelete = async () => {
    console.log('user trying to delete', item._id);
    deleteImage(index);
    APIs.deletePhoto(item._id);
  };
  return (
    <ImageListItem>
      <img
        onClick={() => setOpenModal(true)}
        src={item.imgAddress}
        alt={item.owner}
      />
      <ImageListItemBar
        sx={{
          background: 'none',
          width: 'fit-content',
          zIndex: 2,
        }}
        actionPosition='left'
        actionIcon={
          <Box
            sx={{
              display: 'flex',
              mb: 0.5,
              ml: 0.5
            }}
          >
            {item.owner === userId && (
              <IconButton onClick={()=>handleDelete()}>
                <DeleteOutlineIcon style={{ color: 'white' }} />
              </IconButton>
            )}
          </Box>
        }
      />
      <ImageListItemBar
        sx={{
          background: 'none',
          // width: 'fit-content',
        }}
        actionPosition='right'
        actionIcon={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              mr: 1
            }}
          >
            <IconButton onClick={()=>toggleLike()}>
              <Badge badgeContent={likes} color='primary'>
                {likedByUser ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon style={{ color: 'white' }} />
                )}
              </Badge>
            </IconButton>
            <IconButton>
              <Link href={createDownloadLink(item.imgAddress)}>
                <FileDownloadOutlinedIcon style={{ color: 'white' }} />
              </Link>
            </IconButton>
          </Box>
        }
      />

      <ImageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        item={item}
      />
    </ImageListItem>
  );
}
