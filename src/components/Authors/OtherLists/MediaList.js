import GenericList from "./GenericList";

const MediaList = () => {
    const media = [
      { id: 1, title: "Media Outlet A", date: "2023-01-20", description: "Featured article" },
      { id: 2, title: "Media Outlet B", date: "2023-03-15", description: "Interview" },
      { id: 3, title: "Media Outlet C", date: "2023-06-10", description: "Podcast feature" },
    ];
    return <GenericList title="Media" data={media} />;
  };
  
  export default MediaList;