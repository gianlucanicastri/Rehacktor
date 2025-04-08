import { useState, useEffect, useContext } from "react";
import supabase from "../../../Supabase/Client";
import SessionContext from "../../../context/SessionContext";
import Avatar from "./Avatar";

export default function ProfileAccount() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState('');
  const [created_at, setCreatedAt] = useState(null);

  useEffect(() => {

    let ignore = false;

    async function getProfile() {

      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url, created_at`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
          setCreatedAt(data.created_at);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(newAvatarUrl) {


    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: newAvatarUrl || "",
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);

    }
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <form onSubmit={updateProfile}>
          <div className="row align-items-center justify-content-center">

            <div className="col-md-5 col-12 mb-3">
              <label className="form-label" htmlFor="avatar">Avatar</label>
              <div className="avatar-container form-input d-flex justify-content-between align-items-center">
                <Avatar
                  url={avatar_url}
                  size={150}
                  className="form-signup"
                  onUpload={(event, url) => {
                    updateProfile(event, url);
                  }}
                />
              </div>
            </div>

            <div className=" col-md-5 col-12 form-group mb-3 ">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="text"
                value={session.user.email}
                disabled
                className="form-input"
              />
            </div>



            <div className="form-group col-md-5 col-12 mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                type="text"
                required
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </div>


            <div className="form-group col-md-5 col-12 mb-3">
              <label htmlFor="first_name" className="form-label">First name</label>
              <input
                id="first_name"
                type="text"
                value={first_name || ""}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group col-md-5 col-12 mb-3">
              <label htmlFor="last_name" className="form-label">Last name</label>
              <input
                id="last_name"
                type="text"
                value={last_name || ""}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input"
              />
            </div>


            <div className="form-group col-md-5 col-12 mb-3">
              <label htmlFor="created_at" className="form-label">Data di registrazione</label>
              <input
                id="created_at"
                type="text"
                value={new Date(created_at).toLocaleDateString()}
                disabled
                className="form-input"
              />
            </div>
            <div className="form-group col-10 mt-4">

              <button
                className="submit me-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading ..." : "Update"}
              </button>

              <button
                className="submit"
                type="button"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>




        </form>
      </div>
    </>
  );
}
