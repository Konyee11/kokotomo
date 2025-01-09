import "./ProfileEditModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PropTypes from "prop-types";
import Button from "../btn/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const DEFAULT_COVER = "/images/defaultCover.jpg";
const DEFAULT_PROFILE = "/images/noAvatar.png";

/**
 * 画像アップロード用のFormDataを作成するヘルパー関数
 */
const createFormData = (imageFile, folder, userId) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("folder", folder);
    formData.append("userId", userId);
    return formData;
};

/**
 * 画像を並列でアップロードし、取得したURLを返す
 */
const uploadImages = async (
    coverImage,
    profileImage,
    userId,
    defaultCoverUrl,
    defaultProfileUrl
) => {
    // coverImageがあればFormData作成
    const coverFormData = coverImage
        ? createFormData(coverImage, "cover", userId)
        : null;
    // profileImageがあればFormData作成
    const profileFormData = profileImage
        ? createFormData(profileImage, "person", userId)
        : null;

    // 並列でアップロード
    const [coverRes, profileRes] = await Promise.all([
        coverFormData
            ? axios.post("/api/upload", coverFormData)
            : Promise.resolve(null),
        profileFormData
            ? axios.post("/api/upload", profileFormData)
            : Promise.resolve(null),
    ]);

    // それぞれのURLを取得し、元々のURLがなければデフォルト値を使う
    const coverImageURL = coverRes?.data?.imageUrl || defaultCoverUrl;
    const profileImageURL = profileRes?.data?.imageUrl || defaultProfileUrl;

    return { coverImageURL, profileImageURL };
};

/**
 * プロフィール編集モーダルコンポーネント
 */
export default function ProfileEditModal({ isOpen, onClose, user }) {
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const [coverPreview, setCoverPreview] = useState(
        user?.coverPicture || DEFAULT_COVER
    );
    const [profilePreview, setProfilePreview] = useState(
        user?.profilePicture || DEFAULT_PROFILE
    );

    // アンマウント時にプレビューURLを解放
    useEffect(() => {
        return () => {
            if (coverPreview && coverPreview !== DEFAULT_COVER) {
                URL.revokeObjectURL(coverPreview);
            }
            if (profilePreview && profilePreview !== DEFAULT_PROFILE) {
                URL.revokeObjectURL(profilePreview);
            }
        };
    }, [coverPreview, profilePreview]);

    // ユーザーが画像を選択したらプレビューを表示
    const handleImageChange = (e, setImage, setPreview, defaultUrl) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        } else {
            // 画像選択を取り消した場合は、デフォルトに戻す
            setImage(null);
            setPreview(defaultUrl);
        }
    };

    // 保存ボタンクリック時の処理
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            // 画像アップロード処理
            const { coverImageURL, profileImageURL } = await uploadImages(
                coverImage,
                profileImage,
                user._id,
                user.coverPicture,
                user.profilePicture
            );

            // ユーザー情報を更新
            const updatedUser = {
                userId: user._id,
                coverPicture: coverImageURL,
                profilePicture: profileImageURL,
            };
            const response = await axios.put(
                `/api/users/${user._id}`,
                updatedUser
            );
            console.log("プロフィール更新成功:", response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.log("プロフィールの更新に失敗しました:", error);
        }
    };

    // モーダルが非表示またはユーザー情報がない場合
    if (!isOpen) return null;
    if (!user) {
        return (
            <div className="profileEditModal">
                <p>Loading...</p>
            </div>
        );
    }

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
                            onChange={(e) =>
                                handleImageChange(
                                    e,
                                    setCoverImage,
                                    setCoverPreview,
                                    DEFAULT_COVER
                                )
                            }
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
                            onChange={(e) =>
                                handleImageChange(
                                    e,
                                    setProfileImage,
                                    setProfilePreview,
                                    DEFAULT_PROFILE
                                )
                            }
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
