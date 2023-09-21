import Box from '@mui/material/Box';
import {ImageListItem} from '@mui/material';
import {getUrl} from '../common/ImageFunctions'

export function PictureComponent({path, className = 'pictureComponent'}) {
  return (
      <Box className={className}>
        <ImageListItem>
          <img
              alt="failed to load image"
              src={`${getUrl(path)}`}
          />
        </ImageListItem>
      </Box>
  );
}

export function PictureListComponent(
    {
      pictures,
      className = 'symbolListComponent',
    }) {
  return (
      <Box
          className={className}>
        {
          pictures.map(picture =>
              <PictureComponent
                  path={picture.path}
                  className={
                    picture.chosen ?
                        'pictureSelectedComponent' :
                        'pictureNotSelectedComponent'
                  }
              />,
          )
        }
      </Box>
  );
}
