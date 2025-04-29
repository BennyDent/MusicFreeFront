import { styled, css,alpha, display } from '@mui/system';
import { grey } from './ThreeDotsButton';
import { StyledComponent } from '@emotion/styled';


export const SongCustomDiv:StyledComponent<{hover: 'hover'|'not_hover'}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled('div')(
    ({theme})=>({
        
        variants: [
            {
              props: { hover: 'not_hover'},
              style: {
               display: "flex", flexDirection: "row", 
        backgroundColor: "${them.palette.primary.main}17",
              },
            },
{props: {hover: 'hover'},
style:{ 
    display: "flex", flexDirection: "row", 
  
    backgroundColor: theme.palette.mode === "dark" ? grey[800] : grey[50]}
}
        ]
}
)
);