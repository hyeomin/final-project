import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { GoCalendar, GoHeart, GoQuestion, GoTasklist } from 'react-icons/go';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getMyPosts, getUserRanking } from 'api/myPostAPI';
import postCountIcon from 'assets/icons/postCountIcon.png';
import rankingIcon from 'assets/icons/rankingIcon.png';
import { AuthContext } from 'context/AuthContext';
import { QUERY_KEYS } from 'query/keys';
import HabitCalendar from '../HabitCalendar/HabitCalendar';
import LikesPosts from '../LikesPosts';
import MyPosts from '../MyPosts';
import EditProfile from './EditProfile';
import St from './style';
import ProfileSkeleton from './myPageSkeleton/ProfileSkeleton';
import PostCardSkeleton from '../PostCard/PostCardSkeleton/PostCardSkeleton';

function MyProfile() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isClickedGuide, setIsClickedGuide] = useState(false);
  const [isClickedRanking, setIsClickedRanking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  // 내 게시물 갯수 가져오기
  const {
    data: myPosts,
    error,
    isLoading
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'myPosts'],
    queryFn: getMyPosts,
    staleTime: 60_000,
    enabled: !!authCurrentUser
  });

  if (error) {
    console.error('데이터를 불러오지 못했습니다', error);
  }

  // 랭킹순위 (좋아요 수 기준)
  const { data: userRanking } = useQuery({
    queryKey: ['userRanking'],
    queryFn: getUserRanking
  });

  useEffect(() => {
    const queryString = location.search;
    const searchParams = new URLSearchParams(queryString);
    const profile = searchParams.get('profile') || '';
    setActiveTab(profile || 'calendar');
  }, [location.search]);

  // menuTab 버튼
  const onClickTabBtn = (name: string) => {
    const queryString = location.search;
    const newSearchParams = new URLSearchParams(queryString);
    newSearchParams.set('profile', name);
    setSearchParams(newSearchParams);

    const updatedActiveTab = name;
    setActiveTab(updatedActiveTab);

    const newUrl = `${location.pathname}?${newSearchParams.toString()}`;

    navigate(newUrl);
  };

  // 등급 가이드 확인 버튼
  const ClickedGuideToggleBtn = () => {
    setIsClickedGuide((prevState) => !prevState);
  };

  const ClickedRankingToggleBtn = () => {
    setIsClickedRanking((prevState) => !prevState);
  };

  const userGrade = myPosts?.length;
  let levelOne = 1;
  let levelTwo = 2;
  let levelThree = 3;

  let LevelOneGradeEmoji = '🌱';
  let LevelTwoGradeEmoji = '☘️';
  let LevelThreeGradeEmoji = '🌳';
  let levelEmoji = LevelOneGradeEmoji;
  let level = levelOne;
  if (userGrade && userGrade < 16) {
    levelEmoji = LevelOneGradeEmoji;
    level = levelOne;
  } else if (userGrade && userGrade <= 30) {
    levelEmoji = LevelTwoGradeEmoji;
    level = levelTwo;
  } else if (userGrade && userGrade < 30) {
    levelEmoji = LevelThreeGradeEmoji;
    level = levelThree;
  }

  return (
    <>
      <St.Wrapper>
        {isLoading ? (
          <>
            <ProfileSkeleton />
            <PostCardSkeleton />
          </>
        ) : (
          <>
            <St.ProfileEditWrapper>
              <EditProfile />
              <St.UserPostInfoContainer>
                <St.PostInfoBox>
                  <div>게시물 수</div>
                  <St.PostInfoIcon>
                    <img src={postCountIcon} />
                    <div>{myPosts ? myPosts.length : '-'}개</div>
                  </St.PostInfoIcon>
                </St.PostInfoBox>
                <St.PostInfoBox>
                  <div style={{ display: 'flex' }}>
                    랭킹
                    <div style={{ cursor: 'pointer' }} onClick={ClickedRankingToggleBtn}>
                      <GoQuestion style={{ fontSize: '15px', marginLeft: '5px', cursor: 'pointer' }} />
                    </div>
                    {isClickedRanking ? (
                      <div>
                        <St.RankingInfoWrapper>
                          <St.RankingInfo>
                            좋아요를 많이 받은 순으로 <br />
                            랭킹이 표시됩니다.
                          </St.RankingInfo>
                        </St.RankingInfoWrapper>
                      </div>
                    ) : null}
                  </div>
                  <St.RankingIcon>
                    <img src={rankingIcon} />
                    <div>
                      {authCurrentUser && userRanking
                        ? userRanking.findIndex((r) => r.uid === authCurrentUser.uid) >= 0
                          ? `${userRanking?.findIndex((r) => r.uid === authCurrentUser.uid) + 1}위`
                          : '없음'
                        : '-'}
                    </div>
                  </St.RankingIcon>
                </St.PostInfoBox>
                <St.PostInfoBox>
                  <div>
                    <div style={{ display: 'flex' }}>
                      <div>등급</div>
                      <div style={{ cursor: 'pointer' }} onClick={ClickedGuideToggleBtn}>
                        <GoQuestion style={{ fontSize: '15px', marginLeft: '5px', cursor: 'pointer' }} />
                      </div>
                    </div>

                    {isClickedGuide ? (
                      <div>
                        <St.GuideGradeWrapper>
                          <St.GuideGrade>
                            Lv1 - 0-15개 : 새싹등급🌱 <br />
                            Lv2 - 16-30개 : 클로버등급☘️ <br />
                            Lv3 - 30개 이상 : 나무등급🌳
                          </St.GuideGrade>
                        </St.GuideGradeWrapper>
                      </div>
                    ) : null}
                    <br />
                    <St.LevelBox>
                      <St.LevelEmoji>{levelEmoji}</St.LevelEmoji>
                      <St.Level>Lv.{level}</St.Level>
                    </St.LevelBox>
                  </div>
                </St.PostInfoBox>
              </St.UserPostInfoContainer>
            </St.ProfileEditWrapper>
          </>
        )}
        <St.TabButtonContainer>
          <St.TabButton
            $isActive={activeTab === 'calendar'}
            onClick={() => {
              onClickTabBtn('calendar');
            }}
          >
            <div>
              <GoCalendar />
              <span>캘린더</span>
            </div>
          </St.TabButton>
          <St.TabButton
            $isActive={activeTab === 'myPosts'}
            onClick={() => {
              onClickTabBtn('myPosts');
            }}
          >
            <div>
              <GoTasklist />
              <span>내 게시물</span>
            </div>
          </St.TabButton>
          <St.TabButton
            $isActive={activeTab === 'likes'}
            onClick={() => {
              onClickTabBtn('likes');
            }}
          >
            <div>
              <GoHeart />
              <span>좋아요</span>
            </div>
          </St.TabButton>
        </St.TabButtonContainer>
        <St.MySectionWrapper>
          <St.Tabs>
            {activeTab === 'calendar' && <HabitCalendar />}
            {activeTab === 'myPosts' && <MyPosts />}
            {activeTab === 'likes' && <LikesPosts />}
          </St.Tabs>
        </St.MySectionWrapper>
      </St.Wrapper>
    </>
  );
}

export default MyProfile;
