import { useNotification } from "../../../core/context/NotificationContext";

function UserPreferences() {
  const [avatar, setAvatar] = useState("https://unavatar.io/substack/bankless");
  const [tempAvatar, setTempAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { showNotification } = useNotification();

  // Rest of the component code...
}

export default UserPreferences; 