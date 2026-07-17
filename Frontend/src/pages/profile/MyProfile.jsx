import { FiEdit2 } from "react-icons/fi";
import { CoverSection } from "../../components/profile/CoverSection";
import { AvatarSection } from "../../components/profile/AvatarSection";
import { ProfileStats } from "../../components/profile/ProfileStats";
import { useProfile } from "../../hooks/useProfile";

export const MyProfile = () => {
  const { profile, updateProfilePhotos } = useProfile();

  const handlePhotoUpload = async (file, type) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds limit (Max 5MB)");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    await updateProfilePhotos(formData);
  };

  const handlePhotoDelete = async (type) => {
    if (!window.confirm(`Are you sure you want to remove your ${type} photo?`))
      return;
    console.log(`Deleting ${type}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden my-6">
      <CoverSection
        imageUrl={profile?.coverImageUrl}
        onUpload={(file) => handlePhotoUpload(file, "cover")}
        onDelete={() => handlePhotoDelete("cover")}
      />

      <div className="relative px-8 pb-8 z-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-20 sm:-mt-24 mb-6 gap-4">
          <AvatarSection
            imageUrl={profile?.profileImageUrl}
            onUpload={(file) => handlePhotoUpload(file, "profile")}
            onDelete={() => handlePhotoDelete("profile")}
          />

          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl border border-gray-200 transition-all duration-200 shadow-sm active:scale-95">
            <FiEdit2 size={14} />
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {profile?.name}
            </h2>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-2xl text-[15px]">
            {profile?.bio ||
              "No bio added yet. Tell the community about yourself!"}
          </p>

          <hr className="border-gray-100 my-6" />

          <ProfileStats
            followers={profile?.followersCount}
            following={profile?.followingCount}
          />
        </div>
      </div>
    </div>
  );
};
