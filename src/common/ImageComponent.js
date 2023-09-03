import Box from '@mui/material/Box';
import {ImageListItem} from '@mui/material';

export function PictureComponent({path, className = 'pictureComponent'}) {
  console.log(className);
  return (
      <Box className={className}>
        <ImageListItem>
          <img
              alt="failed to load image"
              src={`${path}`}
              style={{
                maxHeight: 100,
                maxWidth: 200,
              }}
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
