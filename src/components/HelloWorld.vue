<template>
  <main>
    <div class="left-column">
      <picture>
        <source media="(min-width:320px)" srcset="/images/mobile/eiffel.svg" />
        <source
          media="(min-width:1024px)"
          srcset="/images/desktop/eiffel.svg"
        />
        <img
          src="eiffel.svg"
          alt="image de la tour eiffel"
          style="width: auto"
        />
      </picture>
    </div>
    <div class="middle-column">
      <div class="title-container">
        <h1>{{ $t("slogan") }}</h1>
      </div>
      <div class="text-container">
        <p>{{ $t("slogan") }}</p>
      </div>
    </div>
    <div class="right-column">
      <picture>
        <source
          media="(min-width:320px)"
          srcset="/images/mobile/purple-sky.svg"
        />
        <source
          media="(min-width:1024px)"
          srcset="/images/desktop/purple-sky.svg"
        />
        <img
          src="/images/desktop/purple-sky.svg"
          alt="image du ciel violet"
          style="width: auto"
        />
      </picture>
    </div>
  </main>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    title: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
main {
  @media (min-width: 2441px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  display: grid;

  .left-column {
    @media (min-width: 2441px) {
      display: flex;
      justify-content: right;
      align-self: center;
      width: 100%;
      height: 100%;
      margin: 0;
      img {
        @media (min-width: 2441px) {
          border-radius: 14px 0 0 0;
          width: 600px;
          height: 900px;
        }
      }
    }
  }

  .middle-column {
    color: white;
    @media (min-width: 2441px) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      background: linear-gradient(
        #654089,
        #885db2,
        #bf97e5c4,
        #e3cafb,
        #efdefe
      );
      height: 100%;
      width: 100%;
      .title-container {
        @media (min-width: 320px) and (max-width: 550px) {
          height: 250px;
        }
        display: flex;
        height: 500px;
        justify-content: center;
        align-items: first baseline;
        position: relative;
        &::before {
          content: "o--";
          height: inherit;
          position: absolute;
          left: -33px;
          top: 50%;
          transform: translateY(-23%);
          font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
          font-size: 2vw;
          width: 100px;
          animation: move 5s 0.3s infinite;
        }
        h1 {
          @media (min-width: 320px) and (max-width: 550px) {
            height: 100%;
          }
          height: 100%;
          width: 100%;
          padding-top: 100px;
          letter-spacing: 2vw;
          font-size: 2.5vw;
          color: transparent;
          transition: 0.3s ease;

          &:hover {
            box-shadow: inset 0 0 15px black;
            color: rgba(255, 255, 255, 0.527);
            transition: box-shadow 0.3s ease, color 0.5s ease-in-out;
          }
        }
      }
    }
  }

  .right-column {
    @media (min-width: 2441px) {
      max-width: 600px;
      max-height: 900px;

      img {
        @media (min-width: 2441px) {
          border-radius: 7pc 0 0 0;
          width: 600px;
          height: 900px;
          border-radius: 0 14px 0 0;
        }
      }
    }
  }
}
</style>
