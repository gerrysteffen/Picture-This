/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import AlbumDashboard from "../components/AlbumDashboard/AlbumDashboard";
import { StaticRouter } from "react-router-dom";

test("displays a default thumbnail", async () => {
  const albumDash = render(
    <StaticRouter>
      <AlbumDashboard currentUser={null} />
    </StaticRouter>
  );

  const emptyAlbumImg = await albumDash.findByTestId("thumbnail");
  expect(emptyAlbumImg.src).toContain("Empty-dash.png");
});