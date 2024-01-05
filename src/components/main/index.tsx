import St from "./style";


function Main() {
  return (
    <St.Container>
      <St.AdminSection>
        <img src="" alt="" />
        <St.PrevNextBottons>
          <button>prev</button>
          <button>next</button>
        </St.PrevNextBottons>
      </St.AdminSection>
      <St.TopRankingPosts>
        <St.Title>
          <h1>User Pick???</h1>
          <h2>전체보기</h2>
        </St.Title>
        <St.Nav>
          <button>관리자 게시물</button>
          <button>인기 게시물</button>
          <button>환경보호 제품 추천</button>
          <button>제품 나눔</button>
        </St.Nav>
        <St.PostsSlide>
          <St.ThumbnailsBox>
            <li>
              <img src="" alt="img1" />
            </li>
            <li>
              <img src="" alt="img2" />
            </li>
            <li>
              <img src="" alt="img3" />
            </li>
            <li>
              <img src="" alt="img4" />
            </li>
            <li>
              <img src="" alt="img5" />
            </li>
          </St.ThumbnailsBox>
          <div>
            <button>prev</button>
            <button>next</button>
          </div>
        </St.PostsSlide>
      </St.TopRankingPosts>
      {/* <section>
        <h1>Top 10</h1>
        <ul>
            <li>user1</li>
            <li>user2</li>
            <li>user3</li>
            <li>user4</li>
            <li>user5</li>
            <li>user6</li>
            <li>user7</li>
            <li>user8</li>
            <li>user9</li>
            <li>user10</li>
        </ul>
      </section> */}
    </St.Container>
  );
}

export default Main;

