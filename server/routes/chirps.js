const express = require('express');
const { GetChirps, GetChirp, CreateChirp, UpdateChirp, DeleteChirp } = require('../chirpstore');
const router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        res.json(GetChirp(id));
    } else {
        res.send(GetChirps());
    }
})

router.post('/', (req, res) => {
    CreateChirp(req.body);
    res.sendStatus(200);
})

router.put('/:id', (req, res) => {
    UpdateChirp(req.params.id, req.body);
    res.send('Chirp updated successfully!');
})

router.delete('/:id', (req, res) => {
    DeleteChirp(req.params.id);
    res.send('Chirp deleted successfully!');
})

module.exports = router;