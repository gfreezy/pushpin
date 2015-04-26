from mock import MagicMock


class TestRoom(object):
    def test_compute_identity(self):
        from models.room import Room
        u1 = MagicMock(id=1)
        u2 = MagicMock(id=2)
        u3 = MagicMock(id=3)
        assert(Room.compute_identity([u1, u2, u3]) == Room.compute_identity([u3, u2, u1]))
