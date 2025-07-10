import AlbumModel from "../models/album.model.js";
import SongModel from "../models/song.model.js";
import UserModel from "../models/user.model.js";

export const AllInfo = async (req, res) => {
  try {
    // const totalSongs= await SongModel.countDocuments()
    // const totalAlbums=await AlbumModel.countDocuments()
    // const totalUsers= await UserModel.countDocuments()

    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all(
        [
          SongModel.countDocuments(),
          AlbumModel.countDocuments(),
          UserModel.countDocuments(),
        ],
        SongModel.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          { $group: { _id: "$artist" } },
          { $count: "count" },
        ])
      );
    return res
      .status(200)
      .json({
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists: uniqueArtists[0]?.count || 0,
      });
  } catch (error) {
    console.log("AllInfo error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
