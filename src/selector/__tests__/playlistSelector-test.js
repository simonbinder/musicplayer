import {selectPlaylist} from '../playlistSelector';

describe('playlist selector', () => {
  it('should filter the playlists', () => {
    const playlists = [
      {
        _id: 1,
        name: "test"
      }, {
        _id: 2,
        name: "test2"
      }
    ];
    expect(selectPlaylist(playlists, 1)).toMatchSnapshot();
  })
})
