import "./ProfileEditModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PropTypes from "prop-types";
import Button from "../btn/Button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileEditModal({ isOpen, onClose, user }) {
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [coverPreview, setCoverPreview] = useState(
        user.coverPicture || "/images/defaultCover.jpg"
    );
    const [profilePreview, setProfilePreview] = useState(
        user.profilePicture || "/images/noAvatar.png"
    );

    // カバー画像が変更されたらプレビューを表示する
    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    // プロフィール画像が変更されたらプレビューを表示する
    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    // プロフィールを更新する
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // アップロード用のFormDataを作成
            const coverFormData = new FormData();
            if (coverImage) {
                coverFormData.append("image", coverImage);
                coverFormData.append("folder", "cover");
            }

            const profileFormData = new FormData();
            if (profileImage) {
                profileFormData.append("image", profileImage);
                profileFormData.append("folder", "person");
            }

            // 並列で画像をアップロードする
            const [coverRes, profileRes] = await Promise.all([
                coverImage
                    ? axios.post("/api/upload", coverFormData)
                    : Promise.resolve(null),
                profileImage
                    ? axios.post("/api/upload", profileFormData)
                    : Promise.resolve(null),
            ]);

            // 画像のURLを取得
            const coverImageURL = coverRes?.data?.imageUrl || user.coverPicture;
            const profileImageURL =
                profileRes?.data?.imageUrl || user.profilePicture;

            // プロフィールを更新する
            const updatedUser = {
                userId: user._id,
                coverPicture: coverImageURL,
                profilePicture: profileImageURL,
            };
            const response = await axios.put(
                `/api/users/${user._id}`,
                updatedUser
            );
            console.log(response.data);
            onClose();
        } catch (error) {
            console.log("プロフィールの更新に失敗しました", error);
        }
    };

    // メモリリークを防ぐためにプレビュー画像が更新されたら前の画像のURLを解放する
    useEffect(() => {
        return () => {
            if (coverPreview && coverPreview !== "/images/defaultCover.jpg") {
                URL.revokeObjectURL(coverPreview);
            }
            if (profilePreview && profilePreview !== "/images/noAvatar.png") {
                URL.revokeObjectURL(profilePreview);
            }
        };
    }, [coverPreview, profilePreview]);

    if (!isOpen) return null;

    return (
        <div className="profileEditModal" onClick={onClose}>
            <div
                className="profileEditModal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="profileEditModal__header">
                    <div className="profileEditModal__header__left">
                        <div
                            className="profileEditModal__icon"
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </div>
                        <h3 className="profileEditModal__title">
                            プロフィールを編集
                        </h3>
                    </div>
                    <Button
                        title="保存"
                        size="middium"
                        type="submit"
                        form="profileForm"
                    />
                </div>
                <form
                    className="profileEditModal__form"
                    id="profileForm"
                    onSubmit={handleSubmit}
                >
                    <div className="profileEditModal__profileImg">
                        {/* カバー画像 */}
                        <label htmlFor="coverInput">
                            <AddAPhotoIcon className="cameraAltIcon--cover" />
                        </label>
                        <input
                            type="file"
                            id="coverInput"
                            accept=".png,.jpeg,.jpg"
                            style={{ display: "none" }}
                            onChange={handleCoverChange}
                        />
                        <img
                            src={coverPreview}
                            alt="カバー画像"
                            className="profileEditModal__profileImg__cover"
                        />
                        {/* プロフィール画像 */}
                        <label htmlFor="profileInput">
                            <AddAPhotoIcon className="cameraAltIcon--profile" />
                        </label>
                        <input
                            type="file"
                            id="profileInput"
                            accept=".png,.jpeg,.jpg"
                            style={{ display: "none" }}
                            onChange={handleProfileChange}
                        />
                        <img
                            src={profilePreview}
                            alt="プロフィール画像"
                            className="profileEditModal__profileImg__profile"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

ProfileEditModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    user: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string,
        coverPicture: PropTypes.string,
        profilePicture: PropTypes.string,
        place: PropTypes.string,
    }),
};
