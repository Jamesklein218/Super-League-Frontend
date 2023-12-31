import { useNavigate } from "react-router-dom";
import ArrowRight from "../assets/images/arrow-right.svg?react";
import Page from "../layout/Page";
import { useEffect, useState } from "react";
import { axios } from "../custom-axios";
import { API_URL } from "../config";
import { Match } from "../types";

export default function Main() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<Match[]>([]);
  const [season, setSeason] = useState<number>(2019);

  useEffect(() => {
    axios.get(`${API_URL}matches/${season}`).then((res) => {
      setMatches(res.data);
    });
  }, [season]);

  return (
    <Page>
      <div className="container mx-auto">
        <select
          defaultValue={season?.toString()}
          onChange={(e) => setSeason(parseInt(e.target.value || "1"))}
          className="select select-bordered w-full max-w-xs mt-20"
        >
          <option disabled>Select Season</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
          <option>2019</option>
        </select>

        <table className="table mt-20">
          <tbody>
            {/* row 1 */}
            {matches.map((match, index) => (
              <tr
                key={match.Match_id}
                onClick={() => navigate(`/match/${season}/${match.Match_id}`)}
                className="hover:bg-slate-800 hover:text-white hover:cursor-pointer hover:pr-3 border-gray-400 transform duration-300"
              >
                <th>{index + 1}</th>
                <td>
                  {match.Home_club_name} vs {match.Away_club_name}
                </td>
                <td>{match.Stadium}</td>
                <td className="">
                  <ArrowRight className="w-5 h-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
