import { createFileRoute } from '@tanstack/react-router'
import { MusicianCreate } from '../AuthorandAlndGenreTagsCreate/MusicianCreate'
import { TagsGenresCreate } from '../AuthorandAlndGenreTagsCreate/TagsGenresCreate'
import { ColumnWrapper } from '../utils/ContainerWrapper'
export const Route = createFileRoute('/extra_creation_pages')({
  component: ({})=>(<ColumnWrapper>
    <MusicianCreate/>
    <TagsGenresCreate status="genres"/>
   <TagsGenresCreate status="tags"/>
</ColumnWrapper>
  
  )
})